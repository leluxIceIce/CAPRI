import torch
import torch.nn as nn
import torch.nn.functional as F

class ChannelAttention(nn.Module):
    """CBAM Channel Attention Module."""
    def __init__(self, in_planes, ratio=8):
        super(ChannelAttention, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)
           
        self.fc = nn.Sequential(
            nn.Conv2d(in_planes, in_planes // ratio, 1, bias=False),
            nn.ReLU(),
            nn.Conv2d(in_planes // ratio, in_planes, 1, bias=False)
        )
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = self.fc(self.avg_pool(x))
        max_out = self.fc(self.max_pool(x))
        out = avg_out + max_out
        return self.sigmoid(out)

class SpatialAttention(nn.Module):
    """CBAM Spatial Attention Module."""
    def __init__(self, kernel_size=7):
        super(SpatialAttention, self).__init__()
        assert kernel_size in (3, 7), 'kernel size must be 3 or 7'
        padding = 3 if kernel_size == 7 else 1
        self.conv1 = nn.Conv2d(2, 1, kernel_size, padding=padding, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = torch.mean(x, dim=1, keepdim=True)
        max_out, _ = torch.max(x, dim=1, keepdim=True)
        x = torch.cat([avg_out, max_out], dim=1)
        x = self.conv1(x)
        return self.sigmoid(x)

class ContrastiveProjectionHead(nn.Module):
    """Projection head for contrastive learning (non-linear MLP)."""
    def __init__(self, in_dim: int = 128, out_dim: int = 128):
        super(ContrastiveProjectionHead, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, in_dim),
            nn.ReLU(),
            nn.Linear(in_dim, out_dim)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)

class ResBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super(ResBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        self.shortcut = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=stride, bias=False),
                nn.BatchNorm2d(out_channels)
            )

    def forward(self, x):
        out = F.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += self.shortcut(x)
        out = F.relu(out)
        return out

class EcologicalFingerprintEncoder(nn.Module):
    """
    Stage II - Layer 5: Ecological Fingerprint Encoder.
    Deep ResNet-based encoder for 20x20 observation cubes.
    Combines Observation Cube (C) + Relationship Tensor (R) + Spatial Tensor (P)
    into a unified latent representation h in R^128.
    Uses deep Residual Blocks with spatial and channel attention (CBAM).
    Includes a separate projection head for contrastive training.
    """
    def _make_layer(self, in_channels, out_channels, blocks, stride):
        layers = []
        layers.append(ResBlock(in_channels, out_channels, stride))
        for _ in range(1, blocks):
            layers.append(ResBlock(out_channels, out_channels, 1))
        return nn.Sequential(*layers)

    def __init__(self, in_channels: int, latent_dim: int = 128, use_projection: bool = False):
        super(EcologicalFingerprintEncoder, self).__init__()
        
        # Initial Convolution (20x20)
        self.conv1 = nn.Conv2d(in_channels, 64, kernel_size=3, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(64)
        
        # Deep Residual Blocks
        self.layer1 = self._make_layer(64, 64, blocks=2, stride=1)   # 20x20
        
        # Attention layer (CBAM) after first block
        self.ca = ChannelAttention(64)
        self.sa = SpatialAttention()
        
        self.layer2 = self._make_layer(64, 128, blocks=2, stride=2)  # 8x8
        self.layer3 = self._make_layer(128, 256, blocks=2, stride=2) # 4x4
        self.layer4 = self._make_layer(256, 256, blocks=2, stride=1) # 4x4
        
        self.pool = nn.AdaptiveAvgPool2d((2, 2))  # → 2x2
        
        self.fc = nn.Sequential(
            nn.Linear(256 * 2 * 2, 512),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(512, latent_dim)
        )
        
        # Separate projection head for contrastive loss optimization
        self.projection_head = ContrastiveProjectionHead(in_dim=latent_dim, out_dim=latent_dim)
        self.use_projection = use_projection

    def encode(self, x: torch.Tensor) -> torch.Tensor:
        """
        Extracts only the latent representation h (no projection head).
        """
        # Initial Layer
        out = F.relu(self.bn1(self.conv1(x)))
        
        # ResNet Block 1
        out = self.layer1(out)
        
        # Apply Attention
        out = self.ca(out) * out
        out = self.sa(out) * out
        
        # ResNet Blocks 2, 3, 4
        out = self.layer2(out)
        out = self.layer3(out)
        out = self.layer4(out)
        
        # Adaptive pooling & flattening
        out = self.pool(out)
        out = out.view(out.size(0), -1)
        
        # Latent representation
        h = self.fc(out)
        return h

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Forward pass. If self.use_projection is True, returns projection head output
        g(h) for contrastive loss calculation. Otherwise, returns latent representation h.
        """
        h = self.encode(x)
        if self.use_projection:
            return self.projection_head(h)
        return h

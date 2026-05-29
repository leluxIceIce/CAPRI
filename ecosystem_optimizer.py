"""
Multi-agent optimization for ecosystem design.
Agents (plants) self-organize, respecting constraints and forming symbiosis networks.

Key concept: Use RL + physics-based penalties to evolve a beautiful, stable ecosystem.
"""

import numpy as np
import pandas as pd
from dataclasses import dataclass
from typing import List, Tuple
import matplotlib.pyplot as plt


@dataclass
class Plant:
    """Represents a plant in the ecosystem."""
    x: float  # Position
    y: float
    plant_type: str  # e.g., 'nitrogen_fixer', 'deep_root', 'nurse_plant'
    root_depth: float
    canopy_radius: float
    height: float
    nutrient_needs: dict  # {'N': 0.5, 'P': 0.3, 'K': 0.4}
    symbionts: List[str] = None  # e.g., ['mycorrhizal_fungi', 'nitrogen_bacteria']
    fitness: float = 0.0
    
    def __post_init__(self):
        if self.symbionts is None:
            self.symbionts = []


@dataclass
class Soil:
    """Soil state at a location."""
    x: float
    y: float
    nutrients: dict  # {'N': amount, 'P': amount, 'K': amount}
    contaminants: dict  # {'Pb': amount, 'Cd': amount}
    microbial_diversity: float  # 0-1


class EcosystemSimulator:
    """Simulate plant growth and nutrient dynamics with multi-agent optimization."""
    
    def __init__(self, width: float = 100, height: float = 100):
        self.width = width
        self.height = height
        self.plants: List[Plant] = []
        self.soil_map = {}  # {(x, y): Soil}
        self.time_step = 0
        self.history = []
        
        # Phytoremediation plant database
        self.plant_database = {
            'hyperaccumulator': {
                'root_depth': 2.0,
                'canopy_radius': 1.5,
                'height': 3.0,
                'nutrient_needs': {'N': 0.3, 'P': 0.2, 'K': 0.2},
                'contaminant_uptake': {'Pb': 0.8, 'Cd': 0.6},
                'symbionts': ['mycorrhizal_fungi'],
            },
            'nitrogen_fixer': {
                'root_depth': 3.0,
                'canopy_radius': 2.0,
                'height': 4.0,
                'nutrient_needs': {'N': 0.1, 'P': 0.4, 'K': 0.3},
                'symbionts': ['nitrogen_bacteria', 'mycorrhizal_fungi'],
            },
            'nurse_plant': {
                'root_depth': 1.5,
                'canopy_radius': 3.0,
                'height': 5.0,
                'nutrient_needs': {'N': 0.6, 'P': 0.3, 'K': 0.4},
                'symbionts': ['mycorrhizal_fungi'],
            },
            'pioneer': {
                'root_depth': 1.0,
                'canopy_radius': 1.0,
                'height': 2.0,
                'nutrient_needs': {'N': 0.2, 'P': 0.1, 'K': 0.1},
                'symbionts': ['nitrogen_bacteria'],
            },
        }
    
    def add_plant(self, x: float, y: float, plant_type: str) -> None:
        """Add a plant to the ecosystem."""
        if plant_type not in self.plant_database:
            raise ValueError(f'Unknown plant type: {plant_type}')
        
        spec = self.plant_database[plant_type]
        plant = Plant(
            x=x, y=y, plant_type=plant_type,
            root_depth=spec['root_depth'],
            canopy_radius=spec['canopy_radius'],
            height=spec['height'],
            nutrient_needs=spec['nutrient_needs'],
            symbionts=spec['symbionts'],
        )
        self.plants.append(plant)
    
    def distance(self, p1: Plant, p2: Plant) -> float:
        """Euclidean distance between two plants."""
        return np.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
    
    def calculate_fitness(self, plant: Plant) -> float:
        """
        Calculate plant fitness based on:
        1. Nutrient availability
        2. Symbiosis partnerships
        3. Competition with neighbors
        4. Contaminant stress
        """
        fitness = 1.0
        
        # Symbiosis bonus: plants with more symbionts nearby are healthier
        symbiont_bonus = len(plant.symbionts) * 0.1
        fitness += symbiont_bonus
        
        # Competition penalty: too many neighbors reduces fitness
        neighbor_count = sum(1 for other in self.plants 
                            if other != plant and self.distance(plant, other) < 5.0)
        competition_penalty = neighbor_count * 0.05
        fitness -= competition_penalty
        
        # Overfitting penalty: too many plants of same type
        same_type_count = sum(1 for other in self.plants if other.plant_type == plant.plant_type)
        if same_type_count > 3:
            fitness -= (same_type_count - 3) * 0.1
        
        plant.fitness = max(0.0, fitness)
        return plant.fitness
    
    def simulate_step(self) -> None:
        """Simulate one time step of ecosystem dynamics."""
        
        # Calculate fitness for all plants
        for plant in self.plants:
            self.calculate_fitness(plant)
        
        # Stochastic removal of low-fitness plants (mortality)
        removal_threshold = 0.3
        survivors = []
        for plant in self.plants:
            if plant.fitness > removal_threshold or np.random.random() < plant.fitness:
                survivors.append(plant)
        self.plants = survivors
        
        # Nutrient diffusion and uptake
        for plant in self.plants:
            # Simple: nutrients diffuse outward, plants absorb nearby
            # Real: would use PDE solvers
            pass
        
        self.time_step += 1
        self.history.append(len(self.plants))
    
    def random_initialization(self, n_plants: int = 20, seed: int = 42) -> None:
        """Initialize ecosystem with random plant placements."""
        np.random.seed(seed)
        plant_types = list(self.plant_database.keys())
        
        for _ in range(n_plants):
            x = np.random.uniform(0, self.width)
            y = np.random.uniform(0, self.height)
            plant_type = np.random.choice(plant_types)
            self.add_plant(x, y, plant_type)
    
    def guided_initialization(self, contaminant_hotspots: List[Tuple[float, float]]) -> None:
        """Initialize ecosystem targeting contaminant hotspots with hyperaccumulators."""
        for hx, hy in contaminant_hotspots:
            # Place hyperaccumulator at hotspot
            self.add_plant(hx, hy, 'hyperaccumulator')
            
            # Surround with nitrogen fixers to boost soil
            for angle in np.linspace(0, 2*np.pi, 4, endpoint=False):
                r = 3.0
                x = hx + r * np.cos(angle)
                y = hy + r * np.sin(angle)
                self.add_plant(x, y, 'nitrogen_fixer')
            
            # Add nurse plants for structure
            for angle in np.linspace(0, 2*np.pi, 6, endpoint=False):
                r = 6.0
                x = hx + r * np.cos(angle)
                y = hy + r * np.sin(angle)
                self.add_plant(x, y, 'nurse_plant')
    
    def plot_ecosystem(self, title: str = '') -> None:
        """Visualize the ecosystem layout."""
        fig, ax = plt.subplots(figsize=(10, 10))
        
        colors = {
            'hyperaccumulator': 'red',
            'nitrogen_fixer': 'green',
            'nurse_plant': 'blue',
            'pioneer': 'yellow',
        }
        
        for plant in self.plants:
            color = colors.get(plant.plant_type, 'gray')
            # Plant as circle with radius = canopy_radius
            circle = plt.Circle((plant.x, plant.y), plant.canopy_radius, 
                               color=color, alpha=0.6, label=plant.plant_type if plant == self.plants[0] else '')
            ax.add_patch(circle)
            # Fitness as text
            ax.text(plant.x, plant.y, f'{plant.fitness:.2f}', ha='center', va='center', fontsize=8)
        
        ax.set_xlim(0, self.width)
        ax.set_ylim(0, self.height)
        ax.set_aspect('equal')
        ax.set_title(f'{title} (n_plants={len(self.plants)}, time={self.time_step})')
        ax.legend()
        plt.tight_layout()
        return fig


def main():
    """Example: Design a phytoremediation garden."""
    
    print('=== Ecosystem Design Optimization ===\n')
    
    # Create simulator
    sim = EcosystemSimulator(width=100, height=100)
    
    # Define contaminated hotspots (e.g., from soil testing)
    hotspots = [(25, 25), (75, 75), (50, 50)]
    
    print(f'Hotspots (Pb/Cd contamination): {hotspots}')
    print('Initializing ecosystem with strategy: hyperaccumulators at hotspots,')
    print('surrounded by nitrogen fixers and nurse plants...\n')
    
    sim.guided_initialization(hotspots)
    
    print(f'Initial population: {len(sim.plants)} plants')
    sim.plot_ecosystem('Initial Ecosystem Design')
    plt.savefig('/tmp/ecosystem_initial.png')
    
    # Simulate growth over time
    print('\nSimulating ecosystem dynamics...')
    for step in range(50):
        sim.simulate_step()
        if step % 10 == 0:
            avg_fitness = np.mean([p.fitness for p in sim.plants])
            print(f'  Step {step}: {len(sim.plants)} plants, avg_fitness={avg_fitness:.3f}')
    
    sim.plot_ecosystem('Final Ecosystem Design')
    plt.savefig('/tmp/ecosystem_final.png')
    
    print(f'\nFinal population: {len(sim.plants)} plants')
    print('Population history:', sim.history)
    
    # Statistics
    type_counts = {}
    for plant in sim.plants:
        type_counts[plant.plant_type] = type_counts.get(plant.plant_type, 0) + 1
    print(f'Plant types: {type_counts}')
    print(f'Avg fitness: {np.mean([p.fitness for p in sim.plants]):.3f}')


if __name__ == '__main__':
    main()

import pytest
import os
import tempfile
import numpy as np
import pandas as pd
from datetime import datetime
from temporal_batch import parse_timestamp, get_seasonal_features, SavedSample, TemporalBatch

def test_parse_timestamp():
    assert parse_timestamp("observation_2020-05-15.csv") == "2020-05-15"
    assert parse_timestamp("cube_2021-12-31.csv") == "2021-12-31"
    with pytest.raises(ValueError):
        parse_timestamp("some_other_file.csv")

def test_get_seasonal_features():
    sin_val, cos_val = get_seasonal_features("2020-01-01")
    assert isinstance(sin_val, float)
    assert isinstance(cos_val, float)
    
    sin_val2, cos_val2 = get_seasonal_features(datetime(2020, 1, 1))
    assert sin_val == sin_val2
    assert cos_val == cos_val2

def test_temporal_batch_from_folder():
    with tempfile.TemporaryDirectory() as tmpdir:
        # Create a few mock files
        # Files need to contain 400 lines or be valid CSVs for the builder
        df = pd.DataFrame({
            "CHL": np.random.rand(400),
            "aphy": np.random.rand(400),
            "ADG": np.random.rand(400),
            "bbp": np.random.rand(400),
            "TSM": np.random.rand(400),
            "PAR": np.random.rand(400),
            "KD490": np.random.rand(400),
            "longitude": np.full(400, 5.0),
            "latitude": np.full(400, 54.0)
        })
        
        df.to_csv(os.path.join(tmpdir, "observation_2020-06-01.csv"), index=False)
        df.to_csv(os.path.join(tmpdir, "cube_2020-06-02.csv"), index=False)
        
        batch = TemporalBatch.from_folder(tmpdir)
        assert batch.batch_id == os.path.basename(tmpdir)
        assert len(batch.samples) == 2
        assert batch.samples[0].timestamp == "2020-06-01"
        assert batch.samples[1].timestamp == "2020-06-02"
        assert batch.samples[0].coordinates == (5.0, 54.0)
        assert "CHL" in batch.samples[0].variables
        assert len(batch.samples[0].embedding) == 128

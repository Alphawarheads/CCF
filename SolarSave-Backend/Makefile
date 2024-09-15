.PHONY: install test run clean

install:
    pip install --upgrade pip
    pip install -r docs/requirements.txt

test:
    pytest tests/

run:
    python app/device_simulation.py

clean:
    find . -type d -name "__pycache__" -exec rm -r {} +

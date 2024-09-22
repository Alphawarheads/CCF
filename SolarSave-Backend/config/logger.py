import logging

import sys
sys.path.append("..")
from settings import LOG_LEVEL

# Create a custom logger
logger = logging.getLogger('SolarSaveLogger')
logger.setLevel(LOG_LEVEL)

# Create handlers
c_handler = logging.StreamHandler(sys.stdout)
c_handler.setLevel(LOG_LEVEL)

# Create formatters and add it to handlers
c_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
c_handler.setFormatter(c_format)

# Add handlers to the logger
logger.addHandler(c_handler)

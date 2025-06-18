import logging 

def get_logger(name=__name__): 
    # Create or retrieve logger with the specified name 
    logger = logging.getLogger(name)

    # Only add handlers if none exist (prevents duplicates)
    if not logger.handlers:
        handler = logging.FileHandler("app.log") # Log messages into app.log
        formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s") # Log format: timestamp, level, content
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        logger.setLevel(logging.INFO) # Set log level to INFO, can be changed if necessary
    return logger 
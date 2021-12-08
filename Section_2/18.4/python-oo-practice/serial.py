"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        """Get value of start and set counter equal to start"""
        self.start = start
        self.counter = start

    def __repr__(self):
        return f"<SerialGenerator (start = {self.start}, counter = {self.counter})>"

    def generate(self):
        """Return counter and increment by 1"""
        counter = self.counter
        self.counter += 1
        return counter
        
    def reset(self):
        """Reset counter to equal start"""
        self.counter = self.start

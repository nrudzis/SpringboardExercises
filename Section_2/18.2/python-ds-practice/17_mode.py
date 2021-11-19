def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    largest = 0
    most_common = 0
    for k, v in {num: nums.count(num) for num in nums}.items():
        if v > largest:
            most_common = k
            largest = v
    return most_common

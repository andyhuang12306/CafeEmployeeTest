import random, string

def random_str(length):
	key = 'UI'
	for i in range(length):
		key += random.choice(string.ascii_uppercase + string.digits)
	return key
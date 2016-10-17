from example import (
    f401_unused as unused_module)


def c901_too_complex(x):
    if x > 1:
        if x > 2:
            if x > 3:
                if x > 4:
                    if x > 5:
                        if x > 6:
                            if x > 7:
                                if x > 8:
                                    if x > 9:
                                        if x > 10:
                                            if x > 11:
                                                pass


def indent_unaligned():
    try:
        print('H501 %(self)s' % locals())
    except:  # <- H201
        pass

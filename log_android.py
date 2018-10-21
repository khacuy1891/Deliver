#!/usr/bin/python
# build_native.py
# Build native codes
# 
# Please use cocos console instead


import sys
import os, os.path
import shutil
from optparse import OptionParser

current_dir = os.path.dirname(os.path.realpath(__file__))
command = 'react-native log-android'
print command
os.system('cls')
os.system(command)


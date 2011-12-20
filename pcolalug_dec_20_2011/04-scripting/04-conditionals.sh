#!/usr/bin/env bash

if [ "$1" = "if" ]; then
    if [ "$2" = "$3" ]; then
        echo "Those are the same!!"
    else
        echo "Those are different!"
    fi
elif [ "$1" = "for" ]; then
    echo "Current files in this directory are:"
    for i in $( ls ); do
        echo "$i"
    done
elif [ "$1" = "while" ]; then
    COUNTER=0
    while [ $COUNTER -lt 10 ]; do
        echo "Counter is at $COUNTER"
        #let COUNTER=COUNTER+1
        COUNTER=$(($COUNTER+1))
    done
fi

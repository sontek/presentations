#!/bin/bash
LINES=$(tput lines)
COLUMNS=$(tput cols)
clear

declare -A snowflakes
declare -A lastflakes

while :
do
    mod=$(($RANDOM % 10))
    if [ $mod -eq 0 ]; then
        mod=4
    fi

    for ((x=0; x<=$COLUMNS; x++))
    do
        i=$(($RANDOM % $COLUMNS))

        if [ $(($i % $mod)) -eq 0 ]; then
            if [ "${snowflakes[$i]}" = "" ] || [ "${snowflakes[$i]}" = "$LINES" ]; then
                snowflakes[$i]=0
            else
                if [ "${lastflakes[$i]}" != "" ]; then
                    printf "\033[%s;%sH \033[0;0H " ${lastflakes[$i]} $i
                fi
            fi

            printf "\033[%s;%sH*\033[0;0H" ${snowflakes[$i]} $i

            lastflakes[$i]=${snowflakes[$i]}

            snowflakes[$i]=$((${snowflakes[$i]}+1))
        fi
    done
    sleep 0.1
done

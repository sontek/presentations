#!/usr/bin/env bash

lang="$1"
text="$2"

translated_text=$(wget -U "Mozilla/5.0" -qO - "http://translate.google.com/translate_a/t?client=t&text=$text&sl=auto&tl=$lang" | sed 's/\[\[\[\"//' | cut -d \" -f 1)
translated_audio_url="http://translate.google.com/translate_tts?tl=$lang&q=$(echo "$translated_text" | sed 's#\ #\+#g')"

echo "$translated_text"

wget --quiet -O "/tmp/translated.mp3" -U "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.5)" "$translated_audio_url"

mpg123 /tmp/translated.mp3

import json

options = {
  "а": ["а", "о"],
  "о": ["а", "о"],
  "и": ["и", "е", "ы"],
  "е": ["и", "е"],
  "ы": ["и", "ы"],
  "п": [],
  "я": [],
  "л": [],
  "ю": [],
  "_": [],
  "м": [],
  "с": [],
  "н": [],
  "ь": [],
  "р": [],
  
}
with open("9.txt", "r", encoding="utf-8") as file:
  text = [i[:-1] for i in file.readlines()]
  words_list = []
  for i in text: 
    for j in i.split(", "):
      words_list.append(j)
  json_arr = []
  for i in words_list:
    context = ""
    if "(" in i:
      context = i[i.find("(") + 1:i.find(")")]
    # print(context)
    # print(i[i.find("("):i.find(")") + 1])
    # print(i)
    word = i.replace(i[i.find("("):i.find(")") + 1], "").replace(" ", "")
    missedLetter = ""
    missedIndex = 0
    for j in range(len(word)):
      if (word[j] == "_" or word[j].upper() == word[j]):
        missedLetter = word[j].lower()
        missedIndex = j
    json_arr.append({"word": i.lower(), 
                     "missedLetter": missedLetter,
                     "missedIndex": missedIndex,
                     "options": options[missedLetter],
                     "context": context,
                     "type": ["Непроверяемые"]
                     })
  print(json.dumps(json_arr, ensure_ascii=False))
  f = open("origins/9.json", "a")
  f.write(json.dumps(json_arr))
  f.close()
import json
import re

# options_arr = {
#   "а": ["а", "о"],
#   "о": ["а", "о"],
#   "и": ["и", "е"],
#   "е": ["и", "е"],
#   "ы": ["и", "ы"],
#   "п": [],
#   "я": [],
#   "л": [],
#   "ю": [],
#   "_": [],
#   "м": [],
#   "с": [],
#   "н": [],
#   "ь": [],
#   "р": [],
  
# }
# with open("origins/9cher.txt", "r") as file:
#   words_list = [str(i) for i in file.readlines()]
#   current_type = "Чередующиеся"
#   json_arr = []
#   for i in words_list:
#     word = i
#     print(word)
#     context = ""
#     if "(" in word:
#       context = word[word.find("(") + 1:word.find(")")]
#       word = word.replace(word[word.find("("):word.find(")") + 1], "")
#     options = []
#     if "[" in word:
#       options = word[word.find("[") + 1:word.find("]")].split()
#       word = word.replace(word[word.find("["):word.find("]") + 1], "")
#     isIscl = False
#     if "{" in word:
#       isIscl = True
#       word = word.replace(word[word.find("{"):word.find("}") + 1], "")
#     word = word.replace(" ", "")
#     missedLetter = ""
#     missedIndex = 0
#     for j in range(len(word)):
#       if (word[j] == "_" or word[j].upper() == word[j]):
#         missedLetter = word[j].lower()
#         missedIndex = j
#     current_options = []
#     if options != []:
#       current_options = options
#     else:
#       current_options = options_arr[missedLetter]
#     typee = []
#     if isIscl: 
#       typee = [current_type, "Исключение"]
#     else:
#       typee = [current_type]
#     json_arr.append({"word": i.lower(), 
#                      "missedLetter": missedLetter,
#                      "missedIndex": missedIndex,
#                      "options": current_options,
#                      "context": context,
#                      "type": typee
#                      })
#   print(json.dumps(json_arr, ensure_ascii=False))
#   f = open("origins/9.json", "a")
#   f.write(json.dumps(json_arr))
#   f.close()
  

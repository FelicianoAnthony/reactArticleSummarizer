import sys

from flask import Flask, render_template, request, redirect, Response, jsonify
import random, json
from bs4 import BeautifulSoup
from collections import defaultdict
import requests

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem.snowball import SnowballStemmer

app = Flask(__name__)

# used because were making 'cross domain requests?'
@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


#def hello_world(name=None):
	#di = [{'some': 'hi from python!', 'more': 'hi from python1!'}]
	#return json.dumps(di)
	#a = request.args.get('arg1')
	#b = "this arg ({}) from input box will be arg in script".format(a)
	# jsonify automatically creates dict where result is key
	# when doing this.state.posts... result must match this key below 
	#return jsonify(result=b)
	#return json.dumps(b)

@app.route('/hello/', methods=['GET', 'POST'])
def summarize_article(name=None):

	url = request.args.get('arg1')

	r = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"})
	soup = BeautifulSoup(r.content, "html5lib")

	article_text = []
	for i in soup.find_all('p'):
		article_text.append(i.text)

	article_title = ""
	for i in soup.find_all('h1'):
 		article_title+= i.text

	text = " ".join(article_text)

	stemmer = SnowballStemmer("english")
	stopWords = set(stopwords.words("english"))
	words = word_tokenize(text)

	freqTable = dict()
	for word in words:
		word = word.lower()
		if word in stopWords:
			continue

		word = stemmer.stem(word)

		if word in freqTable:
			freqTable[word] += 1
		else:
			freqTable[word] = 1

	sentences = sent_tokenize(text)
	sentenceValue = dict()

	for sentence in sentences:
		for word, freq in freqTable.items():
			if word in sentence.lower():
				if sentence in sentenceValue:
					sentenceValue[sentence] += freq
				else:
					sentenceValue[sentence] = freq



	sumValues = 0
	for sentence in sentenceValue:
		sumValues += sentenceValue[sentence]

	# Average value of a sentence from original text
	average = int(sumValues / len(sentenceValue))


	summary = ''
	for sentence in sentences:
		if (sentence in sentenceValue) and (sentenceValue[sentence] > (1.3 * average)):
			summary += " " + sentence

	diff = len(text) - len(summary) 

	pct_decrease = round(diff / len(text) * 100)


	article_dict = {}

	#article_dict[article_title] = summary
	article_dict['title'] = article_title
	article_dict['text'] = summary 
	article_dict['orig_len'] = len(text)
	article_dict['new_len'] = len(summary)
	article_dict['orig_text'] = text
	article_dict['pct_change'] = pct_decrease

	#return jsonify(result=summary)
	return jsonify(article_dict)

@app.route('/hello2/', methods=['GET', 'POST'])
def getTitle():
	return True


if __name__ == '__main__':
    app.run(debug=True)


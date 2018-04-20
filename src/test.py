from flask import Flask, render_template, request, redirect, Response, jsonify
from bs4 import BeautifulSoup
import requests
import json
import operator
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem.snowball import SnowballStemmer
from nltk.corpus import stopwords
import nltk

app = Flask(__name__)
nltk.download('punkt')
nltk.download('stopwords')

# used because were making 'cross domain requests?'
@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

def summarize_by_sentence_number(summary_dict, num_sentences):
    """
    sort {str:int} dict by values in descending order.
    summary: striing
    """
    score_descending = list(reversed(sorted(summary_dict.items(), key=operator.itemgetter(1))))

    summary_list = []
    for index, (sentence, sentence_score) in enumerate(score_descending):
        if index == num_sentences:
            break
        else:
            summary_list.append(sentence)
            
    return summary_list

def percent_change(original_text, summary_text):         
    """
    both args are lists
    """
    
    orig_text_len = len(" ".join(original_text).split(' '))
    summary_text_len = len(summary_text)
    
    diff = orig_text_len - summary_text_len 
    pct_decrease = round(diff / orig_text_len * 100)
    
    return orig_text_len, summary_text_len, pct_decrease


@app.route('/hello/', methods=['GET', 'POST'])
def summarize_article(name=None, name1=None):

    url = request.args.get('arg1')
    # try:
    #     numSentences = request.args.get('arg2')
    # except Exception as e:
    #     print(str(e))
    
    
    # will eventually hold object return from this function
    article_dict = {}
    
    r = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"})
    soup = BeautifulSoup(r.content, "html5lib")

    # get article title & text
    article_text = [i.text for i in soup.find_all('p')]
    article_title = [i.text.strip() for i in soup.find_all('h1')][0]


    text = " ".join(article_text)

    stemmer = SnowballStemmer("english")
    stop_words = set(stopwords.words("english"))
    words = word_tokenize(text)

    # { word: numTimesWordAppearsInText }
    freq_table = dict()
    for word in words:
        word = word.lower()
        if word in stop_words:
            continue
            
        word = stemmer.stem(word)

        if word in freq_table:
            freq_table[word] += 1
        else:
            freq_table[word] = 1
            
            
    # { sentence: totalWordScoreFromfreq_table }
    sentences = sent_tokenize(text)
    sentence_value = dict()

    for sentence in sentences:
        for word, freq in freq_table.items():
            if word in sentence.lower():
                if sentence in sentence_value:
                    sentence_value[sentence] += freq
                else:
                    sentence_value[sentence] = freq
                            
    # find "average sentence score", multiply by constant, take those above  average  
    sum_values = 0
    for sentence in sentence_value:
        sum_values += sentence_value[sentence]

    # Average value of a sentence from original text
    average = int(sum_values / len(sentence_value))
    
    summary = ''
    for sentence in sentences:
        if (sentence in sentence_value) and (sentence_value[sentence] > (1.3 * average)):
            summary += " " + sentence
    
    summary_list = summary.split(' ')
    orig_length, summary_length, pct_change = percent_change(sentences, summary_list)
    
            
    article_dict['title'] = article_title
    article_dict['summary_text_string'] = summary # formerly text
    article_dict['summary_string_length'] = summary_length
    article_dict['orig_text'] = text
    article_dict['orig_len'] = orig_length
    article_dict['percent_change_string'] = pct_change

    numSentences = request.args.get('arg2')
    ###########################  this part will break the script #######################

    # if user enters "summarize article into x sentences"                
    #if type(numSentences) == int:


    summarize_by_length = summarize_by_sentence_number(sentence_value, int(numSentences))
    article_dict['summary_as_list'] = summarize_by_length
    flatten_summed_as_list = " ".join([i for i in article_dict['summary_as_list'] ]).split(' ')

    orig_length_optarg, summary_length_optarg, pct_change_optarg = percent_change(sentences, flatten_summed_as_list)
    
    article_dict ['summary_list_length'] = summary_length_optarg
    article_dict['pct_change_list'] = pct_change_optarg
    ###########################  this part CAN BREAK script #######################
        
    #return article_dict
    #return jsonify(result=summary)
    return jsonify(article_dict)

@app.route('/hello2/', methods=['GET', 'POST'])
def getTitle():
	return True


if __name__ == '__main__':
    app.run(debug=True)


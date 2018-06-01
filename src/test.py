from flask import Flask, render_template, request, redirect, Response, jsonify
from string import ascii_lowercase
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

def clean_article_text(soup):

    # scrape article text & remove image descriptions 
    article_text = []
    for p in soup.find_all('p'):
        txt = p.text
        if '|' in txt :
            idx = txt.index('|')
            article_text.append(txt[:idx])
        else:
            article_text.append(txt)

    # create list of # of words in each sentence
    sent_length = []
    for i in article_text:
        sentence_split = i.split(' ')
        sent_length.append(len(sentence_split))
       # print("sentence length= {}\n\nsentence= {}\n\n".format(len(sentence_split), sentence_split))

    # sort sentence length & take midpoint 
    sent_length_sorted = sorted(sent_length)
    cutoff2 = round((len(sent_length_sorted) - 1)/2)

    for i in sent_length_sorted:
        if i > cutoff2:
            cutoff2 +=i
            break


    clean_article_text = []
    for i in article_text:
        if len(i) > cutoff2 * 3: ### change this number to alter 
            clean_article_text.append(i)
           #print(i, len(i), '\n\n')

    return clean_article_text

    
    #[i.text for i in soup.find_all('blockquote')]

    # article_text = []
    # for i in soup.find_all('body'):
    #     p_tags = i.find_all('p')
    #     for p in p_tags:
    #         top_level_p = p.find(text=True, recursive=False)
    #         if top_level_p == None:
    #             pass
    #         elif '|' in top_level_p:
    #             idx = top_level_p.index('|')
    #             article_text.append(top_level_p[:idx])
    #         else:
    #             article_text.append(top_level_p)
    # return article_text[:-4]


@app.route('/summarize_text/', methods=['GET', 'POST'])
def summarize_textbox():

    text = request.args.get('textBoxString')

    article_dict = {}

    stemmer = SnowballStemmer("english")
    stop_words = set(stopwords.words("english"))
    words = word_tokenize(str(text))

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
    sentences = sent_tokenize(str(text))
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
    
    
    # get most frequent word
    sorted_by_score = list(reversed(sorted(freq_table.items(), key=operator.itemgetter(1))))
    lower_letters_tuple = tuple(list(ascii_lowercase))
    mostFreqWord = []
    for i in sorted_by_score:
        for letters in i[0]:
            lower_letters = letters
            if lower_letters.startswith((lower_letters_tuple)):
                mostFreqWord.append(i[0])

    article_dict['title'] = 'Most Frequent Word: ' + mostFreqWord[0][0].upper() + mostFreqWord[0][1:]   ## need to change this!!!
    article_dict['summary_text_string'] = summary[:-1]
    article_dict['summary_string_length'] = summary_length
    article_dict['orig_text'] = sentences
    article_dict['orig_len'] = orig_length
    article_dict['percent_change_string'] = pct_change

    
    # check for optional argument 
    try:
        numSentences = request.args.get('sentenceCountStr', type=int)
    except Exception as e:
        print(str(e))
    ###########################  this part will break the script #######################

    # if user enters "summarize article into x sentences"                
    if numSentences:
        summarize_by_length = summarize_by_sentence_number(sentence_value, numSentences)
        article_dict['summary_as_list'] = summarize_by_length
        flatten_summed_as_list = " ".join([i for i in article_dict['summary_as_list'] ]).split(' ')

        orig_length_optarg, summary_length_optarg, pct_change_optarg = percent_change(sentences, flatten_summed_as_list)
        
        article_dict ['summary_list_length'] = summary_length_optarg
        article_dict['pct_change_list'] = pct_change_optarg
    ###########################  this part CAN BREAK script #######################
    #return article_dict
    #return jsonify(result=summary)
    return jsonify(article_dict)





@app.route('/summarize_url/', methods=['GET', 'POST'])
def summarize_article(name=None, name1=None):

    url = request.args.get('urlString')
    # try:
    #     numSentences = request.args.get('arg2')
    # except Exception as e:
    #     print(str(e))
    
    
    # will eventually hold object return from this function
    article_dict = {}
    
    user_agent = request.headers.get('User-Agent')
    r = requests.get(url, headers={"User-Agent": user_agent})
    soup = BeautifulSoup(r.content, "lxml")

    # get article text
    article_text = clean_article_text(soup)

    article_title = []
    for i in soup.find_all('h1'):
        sp = i.text.strip()
        article_title.append(sp)
    
    
    # if domain name in h1 also  -- article title is prob longer list item
    for x in range(len(article_title)):
        print(article_title[x])
        if len(article_title[x]) < 10:
            pass
        else:
            article_title = article_title[x]


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
    article_dict['summary_text_string'] = summary[:-1] # formerly text
    article_dict['summary_string_length'] = summary_length
    article_dict['orig_text'] = article_text
    article_dict['orig_len'] = orig_length
    article_dict['percent_change_string'] = pct_change

    
    # check for optional argument 
    try:
        numSentences = request.args.get('sentenceCountStr', type=int)
    except Exception as e:
        print(str(e))
    ###########################  this part will break the script #######################

    # if user enters "summarize article into x sentences"                
    if numSentences:
        summarize_by_length = summarize_by_sentence_number(sentence_value, numSentences)
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
    app.run(host='0.0.0.0', port=5000, debug=True)
   #app.run(host='127.0.0.1', port=5000, debug=True)


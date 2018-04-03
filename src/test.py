import sys

from flask import Flask, render_template, request, redirect, Response, jsonify
import random, json

from selenium import webdriver 
import urllib.request
import requests, os
from bs4 import BeautifulSoup




app = Flask(__name__)

# used because were making 'cross domain requests?'
@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


def setup_webdriver(path_to_driver): 
    """set up webdriver"""
    chromedriver = path_to_driver
    os.environ["webdriver.chrome.driver"] = chromedriver
    driver = webdriver.Chrome(chromedriver)
    return driver

def create_soup(url):
    """create bs4 object"""
    r = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"})
    return BeautifulSoup(r.content, "html5lib")



@app.route('/hello/', methods=['GET', 'POST'])
def hello_world(name=None):
	#di = [{'some': 'hi from python!', 'more': 'hi from python1!'}]
	#return json.dumps(di)
	a = request.args.get('arg1')
	b = "this arg ({}) from input box will be arg in script".format(a)
	# jsonify automatically creates dict where result is key
	# when doing this.state.posts... result must match this key below 
	return jsonify(result=b)
	#return json.dumps(b)


if __name__ == '__main__':
    app.run(debug=True)


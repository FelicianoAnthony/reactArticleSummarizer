import sys

from flask import Flask, render_template, request, redirect, Response, jsonify
import random, json

app = Flask(__name__)

# used because were making 'cross domain requests?'
@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/hello/', methods=['GET', 'POST'])
def hello_world(name=None):
	di = [{'some': 'hi from python!', 'more': 'hi from python1!'}]
	return json.dumps(di)


if __name__ == '__main__':
    app.run(debug=True)


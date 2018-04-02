import sys
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, redirect, Response, jsonify
import random, json

app = Flask(__name__)
#cors = CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'

@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/hello/', methods=['GET', 'POST'])
def hello_world(name=None):
	di = [{'some': 'text'}]
	return 'hi from python!'
	#return json.dumps(di)
    # buf1 = request.args.get('name')
    # str = {'key':'Hello World!', 'q':buf1}
    # #out = {'key':str}
    # res = json.dumps(str)
    # return res

if __name__ == '__main__':
    app.run(debug=True)

# @app.route('/')
# def output():
# 	# serve index template
# 	return render_template('App.js')

# @app.route('/receiver', methods = ['POST'])
# def worker():
# 	return 'hi from python!'

# if __name__ == '__main__':
# 	# run!
# 	app.run()


# tasks = [
#     {
#         'id': 1,
#         'title': u'Buy groceries',
#         'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
#         'done': False
#     },
#     {
#         'id': 2,
#         'title': u'Learn Python',
#         'description': u'Need to find a good Python tutorial on the web', 
#         'done': False
#     }
# ]

# @app.route('/todo/api/v1.0/tasks', methods=['POST'])
# def create_task():
#     if not request.json or not 'title' in request.json:
#         abort(400)
#     task = {
#         'id': tasks[-1]['id'] + 1,
#         'title': request.json['title'],
#         'description': request.json.get('description', ""),
#         'done': False
#     }
#     tasks.append(task)
#     return jsonify({'task': task}), 201


# @app.route('/todo/api/v1.0/tasks', methods=['GET'])
# def get_tasks():
#     return jsonify({'tasks': tasks})




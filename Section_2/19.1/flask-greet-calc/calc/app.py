from flask import Flask, request
import operations

app = Flask(__name__)


@app.route('/add')
def add():
    """A route that returns the sum of query parameters a and b"""
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    return f"{operations.add(a, b)}"


@app.route('/sub')
def sub():
    """A route that returns the difference of query parameters a and b"""
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    return f"{operations.sub(a, b)}"


@app.route('/mult')
def mult():
    """A route that returns the product of query parameters a and b"""
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    return f"{operations.mult(a, b)}"


@app.route('/div')
def div():
    """A route that returns the quotient of query parameters a and b"""
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    return f"{operations.div(a, b)}"


@app.route('/math/<operation>')
def all_in_one(operation):
    """A route that can add, subtract (sub), multiply (mult), or divide (div) query parameters a and b"""
    a = request.args.get("a", type=int)
    b = request.args.get("b", type=int)
    match operation:
        case "add":
            return f"{operations.add(a, b)}"
        case "sub":
            return f"{operations.sub(a, b)}"
        case "mult":
            return f"{operations.mult(a, b)}"
        case "div":
            return f"{operations.div(a, b)}"

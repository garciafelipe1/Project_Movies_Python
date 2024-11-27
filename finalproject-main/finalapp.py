import os
from flask import Flask, Response, jsonify, request, json
from http import HTTPStatus
import requests
import threading

app = Flask(__name__)


with open("biblioteca.json", encoding='utf-8') as biblioteca_json:
    peliculas = json.load(biblioteca_json)
peliculas = peliculas[0]['peliculas']

with open("usuarios.json", encoding='utf-8') as usuarios_json:
    usuarios = json.load(usuarios_json)
usuarios = usuarios[0]['usuarios']

with open("directores.json", encoding='utf-8') as directores_json:
    directores = json.load(directores_json)
directores = directores[0]['directores']

print("Bienvenido a Stremio!\n")

ultimas_peliculas_agregadas = []


@app.errorhandler(HTTPStatus.NOT_FOUND)
def resource_not_found(error):
    return jsonify(message="Recurso no encontrado"), HTTPStatus.NOT_FOUND

@app.errorhandler(HTTPStatus.BAD_REQUEST)
def bad_request(error):
    return jsonify(message="Solicitud incorrecta"), HTTPStatus.BAD_REQUEST


@app.route("/")
def home():
    if len(ultimas_peliculas_agregadas) > 0:
        return jsonify(ultimas_peliculas_agregadas)
    else:
        return Response("No encontrado", status=HTTPStatus.NOT_FOUND)


@app.route("/usuarios")
def devolver_usuarios():
    try:
        lista = [usuario['usuario'] for usuario in usuarios]
        if lista:
            return jsonify(lista)
        else:
            return Response("No encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)


@app.route("/peliculas")
def devolver_peliculas():
    try:
        mostrar_peliculas = [pelicula['titulo'] for pelicula in peliculas]
        if mostrar_peliculas:
            return jsonify(mostrar_peliculas)
        else:
            return Response("No encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)


@app.route("/peliculas/<id>")
def devolver_pelicula(id):
    try:
        id_int = int(id)
        for pelicula in peliculas:
            if pelicula['id'] == id_int:
                return jsonify(pelicula)
        return Response("No encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)


@app.route("/directores")
def directores_imprimir():
    try:
        lista = list(set(pelicula['director'] for pelicula in peliculas))
        if lista:
            return jsonify(lista)
        else:
            return Response("No encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)


@app.route("/generos")
def generos_imprimir():
    try:
        lista = list(set(pelicula['genero'] for pelicula in peliculas))
        if lista:
            return jsonify(lista)
        else:
            return Response("No encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)


@app.route("/peliculas/imagen")
def devolver_peliculas_con_imagen():
    try:
        dic = {pelicula['titulo']: pelicula['link'] for pelicula in peliculas if "link" in pelicula}
        if dic:
            return jsonify(dic)
        else:
            return Response("No encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)

@app.route("/directores/<id>")
def devolver_peliculas_director(id):
    try:
        id_int = int(id)
        director_nombre = None
        for director in directores:
            if director['id'] == id_int:
                director_nombre = director['director']
                break
        if director_nombre:
            lista = [pelicula['titulo'] for pelicula in peliculas if pelicula['director'] == director_nombre]
            if lista:
                return jsonify(lista)
        return Response("No encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)


@app.route("/peliculas/eliminar/<int:id>", methods=["DELETE"])
def eliminar_pelicula(id):
    try:
        pelicula_a_eliminar = next((pelicula for pelicula in peliculas if pelicula['id'] == id), None)
        if pelicula_a_eliminar:
            peliculas.remove(pelicula_a_eliminar)
            return Response("Eliminado", status=HTTPStatus.OK)
        return Response("Solicitud incorrecta", status=HTTPStatus.BAD_REQUEST)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)

# Publica una nueva película
@app.route("/peliculas/publicar", methods=["POST"])
def comprar_entrada():
    try:
        datos = request.get_json()
        
        if datos['director'] not in [director['director'] for director in directores]:
            new_id = max(director['id'] for director in directores) + 1
            directores.append({
                "id": new_id,
                "director": datos['director']
            })
        
        if len(ultimas_peliculas_agregadas) < 10:
            ultimas_peliculas_agregadas.append(datos['titulo'])
        else:
            ultimas_peliculas_agregadas.insert(0, datos['titulo'])
            ultimas_peliculas_agregadas.pop()

        if not any(pelicula['id'] == datos['id'] for pelicula in peliculas):
            peliculas.append(datos)
            return Response("OK", status=HTTPStatus.OK)
        return Response("Solicitud incorrecta", status=HTTPStatus.BAD_REQUEST)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)


@app.route("/peliculas/actualizar", methods=["PUT"])
def modificar_pelicula():
    try:
        datos = request.get_json()
        if "id" in datos:
            pelicula = next((pelicula for pelicula in peliculas if pelicula['id'] == datos['id']), None)
            if pelicula:
                pelicula.update({key: value for key, value in datos.items() if key != 'id'})
                return Response("OK", status=HTTPStatus.OK)
        return Response("ID no encontrado", status=HTTPStatus.NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=HTTPStatus.INTERNAL_SERVER_ERROR)

login = False

def menu():
    print("")
    while True:
        print("           MENU             ")
        print("----------------------------")
        print("0: Iniciar/cerrar sesion")
        print("1: Mostrar todas las peliculas")
        print("2: Mostrar pelicula especifica")
        print("3: Mostrar ultimas peliculas agregadas")
        print("4: Mostrar peliculas con imagenes")
        print("5: Mostrar directores")
        print("6: Mostrar peliculas de un director especifico")
        print("7: Mostrar usuarios")
        print("8: Mostrar generos")
        print("9: Eliminar pelicula")
        print("10: Publicar pelicula")  #
        print("11: Modificar pelicula")  #
        print("12: Salir")
        opcion = int(input("Ingresar opcion: "))

        if opcion == 0:
            global login
            if not login:
                user = input("Ingresar usuario: ")
                password = input('Ingresar contraseña: ')
                for usuario in usuarios:
                    if usuario['usuario'] == user and usuario['contrasenia'] == password:
                        login = True
                        print("Inicio de sesion exitoso")
                        break
                else:
                    print("Error al iniciar sesion")
            else:
                login = False
                print("Sesion cerrada")

        elif opcion == 1:
            r = requests.get("http://127.0.0.1:5000/peliculas")
            r = r.json()
            for i in r:
                print(i)

        elif opcion == 2:
            id = input("Ingresar id de la pelicula: ")
            r = requests.get(f"http://127.0.0.1:5000/peliculas/{id}")
            r = r.json()
            print(r)

        elif opcion == 3:
            r = requests.get("http://127.0.0.1:5000/")
            r = r.json()
            for i in r:
                print(i)

        elif opcion == 4:
            r = requests.get("http://127.0.0.1:5000/peliculas/imagen")
            r = r.json()
            for key, value in r.items():
                print(f"{key}: {value}")

        elif opcion == 5:
            r = requests.get("http://127.0.0.1:5000/directores")
            r = r.json()
            for i in r:
                print(i)

        elif opcion == 6:
            id = input("Ingresar id del director: ")
            r = requests.get(f"http://127.0.0.1:5000/directores/{id}")
            r = r.json()
            for i in r:
                print(i)

        elif opcion == 7:
            r = requests.get("http://127.0.0.1:5000/usuarios")
            r = r.json()
            for i in r:
                print(i)

        elif opcion == 8:
            r = requests.get("http://127.0.0.1:5000/generos")
            r = r.json()
            for i in r:
                print(i)

        elif opcion == 9:
            id = input("Ingresar id de la pelicula a eliminar: ")
            r = requests.delete(f"http://127.0.0.1:5000/peliculas/eliminar/{id}")
            print(r.status_code)

        elif opcion == 10:
            titulo = input("Ingresar titulo de la pelicula: ")
            descripcion = input("Ingresar descripcion: ")
            genero = input("Ingresar genero: ")
            director = input("Ingresar director: ")
            year = input("Ingresar año: ")
            pelicula = {
                'id': len(peliculas) + 1,
                'titulo': titulo,
                'descripcion': descripcion,
                'genero': genero,
                'director': director,
                'year': year
            }
            r = requests.post("http://127.0.0.1:5000/peliculas/publicar", json=pelicula)
            print(r.status_code)

        elif opcion == 11:
            titulo = input("Ingresar titulo de la pelicula a modificar: ")
            descripcion = input("Ingresar nueva descripcion: ")
            genero = input("Ingresar nuevo genero: ")
            director = input("Ingresar nuevo director: ")
            year = input("Ingresar nuevo año: ")
            pelicula = {
                'titulo': titulo,
                'descripcion': descripcion,
                'genero': genero,
                'director': director,
                'year': year
            }
            r = requests.put("http://127.0.0.1:5000/peliculas/actualizar", json=pelicula)
            print(r.status_code)

        elif opcion == 12:
            break

if __name__ == "__main__":
    t1 = threading.Thread(target=menu)
    t1.start()
    app.run(debug=True, use_reloader=False)

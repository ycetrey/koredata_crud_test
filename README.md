# BD: sqlite
# Server: Python3
# Client: React + vite

# Server
    cd /server/
    python -m venv venv
    
    pip install flask flask-jsonpify flask-sqlalchemy flask_marshmallow flask_cors marshmallow-sqlalchemy modal PyJWT python-dotenv flask_httpauth
    ou
    pip install -r requirements.txt
    python main.py

Obs: sempre que rodar o servidor o banco é dropado e é recriado o usuário admin@koredata.com.br e a senha koredata123

# Client
    cd /client/

    npm install
    npm run dev
        
    usuário e senha default:
        admin@koredata.com.br
        koredata123

# authenticating-react-app
learning how to authenticate the user and to provide or deny any access to the protected data based on their authentication
**Authentication is needed if content should be protected and not accessible by everyone**
1. How Authentication Works In React Apps
2. Implementing User Authentication
3. Adding Auth Persistence & Auto-Logout.

## Two-Step Process:
1. Get access/permission
2. Send a request to a protected resource.

## How Does Authentication Work?
We can't just save and use the "yes". We could send a fake "yes" to the server to request protected data.
### Server-Side Sessions:
Store a unique identifier on a server, and send the same identifier to the client. The client sends identifiers along with requests to protected resources.
### Authentication Tokens:
create but do not store permission tokens on the server, and send the token to the client. client sends tokens along with requests to protected resources. 

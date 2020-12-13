# Draft - Build plan

## login :
- [ ] Need to create a dedicated client in keycloak 

**Notes** regarding login:

There are basically two ways to look at the login. We can either : 

- implement the browser flow - but then we end up with a bad UI design (which is fixable to a certain extend)

- work with direct password mode ON - then we control the design of the UI - but, it is not supposed to be as secured and, anyway it would not work with Google signin and FB signin. 


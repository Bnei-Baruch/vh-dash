# Draft - Build plan

## login :
- [ ] Need to create a dedicated client in keycloak 
- [ ] And a dev server for keycloak

**Notes** regarding login:

There are basically two ways to look at the login. We can either : 

- implement the browser flow - but then we end up with a bad UI design (which is fixable to a certain extend)

- work with direct password mode ON - then we control the design of the UI - but, it is not supposed to be as secured and, anyway it would not work with Google signin and FB signin. 


## Component organisations

Given we are starting with Material App UI kit, we should definitly initial the repo with 
- all the components 
- all the layouts
- Pages : 
    - blank
    - Setting page can interesting as a starting point for the forms 

## Misc point

- No auto save : press save to change
- To be added later : detect if change, notify "save your changes"



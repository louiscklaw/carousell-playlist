
echo "Running tests with additional locally installed Cypress plugins"
echo "Note that plugins need to be installed first"
echo "cd src; npm install"

set-variable -name DISPLAY -value 192.168.10.180:0.0

docker run -it `
  -v ${PWD}/src:/test -w /test `
  cypress/included:10.6.0 --headed

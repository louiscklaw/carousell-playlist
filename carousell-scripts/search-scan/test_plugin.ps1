
echo "Running tests with additional locally installed Cypress plugins"
echo "Note that plugins need to be installed first"
echo "cd src; npm install"

set-variable -name DISPLAY -value 192.168.10.180:0.0

docker run -it `
  -u 1000:1000 `
  -v ${PWD}/src:/test `
  -w /test `
  --net=host `
  -e DISPLAY=$DISPLAY `
  --entrypoint cypress `
  cypress/included:10.6.0 open --project .

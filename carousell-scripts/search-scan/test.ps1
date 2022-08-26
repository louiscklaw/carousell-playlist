set e+x

echo "Running tests with additional locally installed Cypress plugins"
echo "Note that plugins need to be installed first"
echo "cd src; npm install"

docker run `
  -it `
  -v ${PWD}/src:/test `
  -w /test cypress/included:3.8.0 `
  $args
git init


git checkout -b master
echo master > helloworld_test_master.txt
git add . 
git commit -m "test master"


git checkout -b test/test_1
echo 1 > helloworld_test1.txt
git add . 
git commit -m "test1"

git checkout -b test/test_2
echo 2 > helloworld_test2.txt
git add . 
git commit -m "test2"

git checkout -b test/test_3
echo 3 > helloworld_test3.txt
git add . 
git commit -m "test3"

git checkout -b test/test_4
echo 4 > helloworld_test4.txt
git add . 
git commit -m "test4"

git checkout master

git checkout test/test_1
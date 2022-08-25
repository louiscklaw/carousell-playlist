import child_process from 'node:child_process';

const WORKING_DIR = 'c:\\temp\\3';

const result = child_process.execSync('cd', { encoding: 'utf8', cwd: WORKING_DIR });

const checkoutBranch = async (branchName) => {
  return child_process.execSync(`git checkout ${branchName}`, { encoding: 'utf8', cwd: WORKING_DIR });
};

const mergeBranch = async (branchToMerge) => {
  return child_process.execSync(`git merge ${branchToMerge} --ff-only`, { encoding: 'utf8', cwd: WORKING_DIR });
};

console.log({ result });
console.log(checkoutBranch('test/test_1'));
console.log(mergeBranch('test/test_2'));

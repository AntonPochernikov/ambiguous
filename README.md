# Nondeterminictic computation in JavaScript
This small library provides us with tools to describe problems that contain ambiguous values and requirements.  
As the result we can obtain all possible solutions for current problem.

***

### Logic puzzle example
_Baker, Cooper, Fletcher, Miller, and Smith live on different
floors of an apartment house that contains only five
floors. Baker does not live on the top floor. Cooper does
not live on the bottom floor. Fletcher does not live on either
the top or the bottom floor. Miller lives on a higher
floor than does Cooper. Smith does not live on a floor adjacent
to Fletcher’s. Fletcher does not live on a floor adjacent
to Cooper’s. Where does everyone live?_


**First of all we need to create a task:**
```javascript 
import { solve, amb, required } from 'amb';

const floors = [1, 2, 3, 4, 5];

function* problem() {
  // look how we yield ambiguous value as if we are assigning all possible values to every person
  const baker = yield amb(...floors);
  const cooper = yield amb(...floors);
  const fletcher = yield amb(...floors);
  const miller = yield amb(...floors);
  const smith = yield amb(...floors);

  // we must also yield requirements to pick proper solutions
  yield required(areDistinct([baker, cooper, fletcher, miller, smith]));
  yield required(baker !== 5);
  yield required(cooper !== 1);
  yield required(fletcher !== 1 && fletcher !== 5);
  yield required(miller > cooper);
  yield required(Math.abs(smith - fletcher) !== 1);
  yield required(Math.abs(fletcher - cooper) !== 1);

  return { baker, cooper, fletcher, miller, smith };
}

function areDistinct([first, ...rest]) {
  if (rest.length === 0) {
    return true;
  }
  if (rest.find(item => item === first)) {
    return false;
  }
  return areDistinct(rest);
};
```

**Simply get all solutions:**
```javascript 
solve(problem);
// => [{ baker: 3, cooper: 2, fletcher: 4, miller: 5, smith: 1 }];
```

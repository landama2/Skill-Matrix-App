### Summary

This project is an application that contains people and their skills.
Following frontend test are a showcase for a few techniques taught during
the Software Quality Assurance class of 2020/2021 at CTU FEE.

### Equivalence classes

Email can be registered only if it is unempty, has correct format and is not yet registered.

| Email              | invalid format | valid format, already in use | valid format, unused | empty |
| ------------------ | -------------- | ---------------------------- | -------------------- | ----- |
| Can be registered? | No             | No                           | Yes                  | No    |

Username must be at least 3 charats but at max 32

| Username length    | <= 2 | 2 < … <= 32 | > 32 |
| ------------------ | ---- | ----------- | ---- |
| Can be registered? | No   | Yes         | No   |

Provided passwords must match and must be 4+ characters.

| Passwords    | don't match | under 4 characters | valid |
| ------------ | ----------- | ------------------ | ----- |
| Can be used? | No          | No                 | Yes   |

### Parametrized tests

There are 9 frontend tests.

3 files with test combinations have been created.
twoway-acts.csv - basic 2-way coverage
3way.csv - 3-way coverage
mixed.csv - mixed coverage

We use parametrized test in MainTest class in "register" test function.

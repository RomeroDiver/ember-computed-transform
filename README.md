## How to run
1. Clone repo
2. Run `npm install`
3. Run `transform --source="glob-path-to-source"`

*Note:* I've tested this with sources being in the same directory - not sure if it needs more permissions to run as a standalone tool.

## How it can be improved
1. Integrate with existing eslint/prettier? The things is, some small things might come out from this transformer(e.g. double quotes) that differ from the current setup. On the other hand, this is an optional feature, as a developer might have a pre-commit hook that runs eslint/prettier
2. Handle errors? At the moment, I don't handle error too much- ther is a lot of places where errors can crash the tool.
3. Adjust transforms to different situations? One thing that I see now is I always return the last argument of the Ember.computed as a function. What if it was an arrow function initially?

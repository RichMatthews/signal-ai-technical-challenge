## Signal AI technical challenge submission

## Running the app

Clone the repo
`git clone https://github.com/RichMatthews/signal-ai-technical-challenge`

cd into the directory and run the app

```
cd signal-ai-technical-challenge
yarn dev
```

## Tools & approach used

- I've decided to use Next JS to build the app out, for two main reasons
  - Firstly, I've never hugely used it before so wanted to get a bit of experience with it
  - Secondly, if I was to extent the app I might try and incorporate SSR or something which Next handles nicely out the box
- The app is written in React as I have a lot of experience in that
- State management is mainly handled at a component level. But there are a couple of instances when I used Context API as I needed
  data to expand across multiple components. Redux would work too (speificially Redux-toolkit is a good package I've used before) but
  thought it might be overkill for this project

## Things to improve in the future

- I would add the ability to remove a favourite from the favourite screen and maybe to group or filter them
- I would write more tests. Obviously normally I would expect a high level of code coverage but for the purposes of this tets, a few will suffice
- I added some basic error handling but with more time I would like to flesh this out a bit more
- I added some basic loading states but I would also improve this and make it better visually going forward

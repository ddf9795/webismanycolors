# Homework 2

The goal for this assignment is to take what we've learned so far and apply it on your own. I'm giving you a basic Vite project, and not much else.

> Note: There are no unit or e2e tests provided for this assignment. Grading will be done by me, manually - giving you the flexibility to experiment without the constraints of the tests

You will create a web application that:

- Plays [Audio](#audio)
- Draws [Visuals](#visuals) to a Canvas (or several?)
- Accepts User [Interaction](#interaction) (keyboard, mouse, microphone, other?)
- As a cohesive [Experience](#experience)

Performing those tasks will earn you 80% of the credit. To get up to 100%, you need to go above the baseline in some way:

- Make me say ["Wow!"](#wow) (in a good way!).
- Write your own [unit tests](#unit-tests).
- Write your own [e2e tests](#e2e-tests).
- Something else you [pitch](#pitch-it) to me (and I approve).

I will deduct points for the following infractions:

- Not updating the DOCS.md file.
- Unhandled error messages in the browser console.
- Crashing the browser tab.

## Baseline Requirements (80%)

### Audio

Use one of the provided tracks (see the tracks.zip file linked in MyCourses under the 6F Announcement) or pick one of your own. Use the Web Audio Context with (at least) an Analyser Node to drive some animation.

|         Name | Points | Description                                                         |
| -----------: | ------ | ------------------------------------------------------------------- |
|        Great | 2      | - It sings (figuratively or literally).                             |
|           OK | 1      | - It makes noise, but there are issues (popping, skipping, errors). |
| Insufficient | 0      | - It doesn't make noise.                                            |

### Visuals

Draw to the canvas based on the Analyser Node and User Interaction.

|         Name | Points | Description                                               |
| -----------: | ------ | --------------------------------------------------------- |
|        Great | 2      | - The canvas is present, and it's smooth and beautiful.   |
|           OK | 1      | - The canvas is present, but there are issues/incomplete. |
| Insufficient | 0      | - The canvas is absent, or it's present but janky.        |

### Interaction

Use keyboard, mouse, microphone, or some other input device to influence the application.

|         Name | Points | Description                                                |
| -----------: | ------ | ---------------------------------------------------------- |
|        Great | 2      | - Inputs are well executed, responsive, and/or nuanced.    |
|           OK | 1      | - There are more inputs, but there are issues/incomplete.  |
| Insufficient | 0      | - There are no inputs, or it's just the play/pause button. |

### Experience

The audio, visuals, and interaction all contribute to the overall theme of the project.

|         Name | Points | Description                                                  |
| -----------: | ------ | ------------------------------------------------------------ |
|        Great | 2      | - A coherent theme is created and reinforced through media.  |
|           OK | 1      | - A theme is present, but some elements feel out of place.   |
| Insufficient | 0      | - There is no apparent theme. Elements are cobbled together. |

## Beyond Baseline (get to 100%)

### Wow!

When I open and run your project, something about it is so well done that I become impressed. Some ideas here include paying extra attention to your design / aesthetics, using an interesting input/interaction method, going particularly deep with the audio or canvas APIs. Demonstrate that you ate, and left no crumbs.

### Unit Tests

Write your own unit tests for your functions - particularly the ones where you provide an input/parameter/argument and get a returned value.

### E2E Tests

Write your own playwright tests (that I can then run to see how your project works).

### Pitch It

Propose something to fit the category (and have me approve it).

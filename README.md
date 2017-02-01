
=============
Keyword Matching
GitHub Code Challenge
Amina Ly
=============

About
------------
A collection of scripts that allow the user to group similar terms given a
csv file of keywords to consider.

*Files Included:*
key_grouper.R --> main script
pattern_matching_functions.R --> functions written for algorithm
tests.R --> Initial testing
keywords.csv --> Input
grouped_terms.csv --> Output

*Running Script:*
*From RStudio (or other IDE)*
- Open key_grouper.R
- Ensure that your working directory is set to the current source file (session -> set working directory -> to source file location)
- Source the file

*From the command line*
- Save keyword.csv file of strings to be grouped in the same directory as the R files.
- Make sure your working directory is set to the same directory as the source
path
- Run the key_grouper.R file

After running the script, a new csv file called "grouped_terms.csv" should appear in the same folder as key_grouper.R

Performance
------------
*Space complexity - O(n^2)*
- The majority of space is taken up by the initial matrix used to store and eventually export the grouped terms. Since the maximum potential size of the returned matrix would be the size of the initial vector squared, the matrix must be initialized to that size.

*Time complexity - O(n^2)*
- Due to the fact that each word attempts to match to every other word in the initial vector, time is always O(n^2). See "Future Considerations" for more detail on why I chose to do this.


Approach Details
------------

From a high level, this algorithm takes in a vector of strings to be grouped, and then for each string searches for approximate "fuzzy" matches using R's built in regex functions. If the string is of "acronym size" (less than 4 characters long), it will also search for words that would be the full spelling. The returned csv file then contains words that have been grouped, intentionally excluding those whose matches were not found to minimize clutter.

This is a pretty conservative approach, focusing on reducing the number of incorrect groupings rather than maximizing groups and allowing for mistakes.  

*Pros of Approach & Types of Correct Matches*
- Output typically only matches things that are pretty similar (minimizing wrong groupings with some exceptions).
- Each word is checked against every other word, allowing words to appear in multiple groups.
- This approach allows for the search of acronym to full-word matches. In addition, acronym matches are order-agnostic given how easy it might be to type in an acronym in the wrong order (usa vs uas).
- Mild misspelling/alternative spellings are recognized and grouped without additional work.
- Largely leverages the functionality of R's base regex package rather than recreating string matching functions.
- Partial matches are recognized and grouped regardless of where in the word the match might be (spark & apache-spark & pyspark).

*Cons of Approach and Mistakes in Matches*
- Output does not reflect words whose matches are not found (intentionally).
- Since every word is checked against every other word. This can lead to repeated groups that must be filtered out at the end.
- This approach neglects words that are similar conceptually but do not have any similarities in spellings.
- Not a scalable solution as the time complexity is O(n^2). This is easily adjusted and discussed in "Further Considerations."
- Does not combine words that end with values similar to how others start (python and scipy would not be matched).
- Matching between non-alpha numeric values and true words are not supported ("C#" and "CSharp" or "fi@" and "fiat" would not be grouped).
- Certain short letter sets might lead to an overmatched group. For example "ica" appears in a number of words such as "analytical" and "graphical" even though they aren't actually related.
- Misspelled acronyms (usq instead of intended usa) are not matched.

*Trade-Offs*
- I decided to allow for increased space and time complexity to increase number of values matched. I could have removed items once they were grouped, but wanted to allow for words to exist in multiple groups.
- Limited the size of potential acronyms to 3 characters long. Partially because keywords given were never longer than three words long, and to search for longer characters would essentially be more effort than it's worth. This might not necessarily be the best choice given a larger/different dataset.
- Does not attempt to match up words that are one letter long such as "r" (returns too many matches that aren't necessarily related). However, would keep some from getting grouped with their appropriate match.
- Acronyms that are off by a letter would likely not be matched to their longer form component. This was intentionally limited as allowing variation in approximate matching for short words leads to overmatching.

Future Considerations
------------

If scaling up I might consider only allowing words to exist within one group at a time. Therefore once a word was added to a group, it would be eliminated from the search vector. With each word, the size of the searched vector would decrease by at least one. Meaning, the number of words to search for would be O(n) rather than O(n^2)--vastly improving efficiency. In this particular case, though, the number of words to search through were pretty small, so it made sense to continually loop through the vector--and potentially create duplicate rows--in order to maximize the number of words grouped.

I wonder what the average length of an acronym is. With a larger project it would probably still be beneficial to put a limit on the length of strings that are searched as acronyms, but the cut off of 3 characters in this solution might not be particularly effective given different data sets. 

Given more time, I would also want to think about the best way to combine words such as python and numpy. This doesn't work with a simple regex, as you would have to match part of the first word to part of the second in a different location. Right now, I do not know the most effective way to automatically search parts of a string that exist in different locations on two strings but it would be an interesting challenge to tackle.

Finally, it would be interesting to know which words are searched within x amount of time of each other for any given user. This may help to create groups of words that are conceptually similar without having much in common spelling-wise.

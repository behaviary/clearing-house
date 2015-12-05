# clearing-house
This is the place to trade fish and ideas.

# Idea

A wiki engine with voting capabilities.


TODO:

Figure out what this is and does.

### Tyler's notes
Since there are duplicate articles, we have to make sure there are no collisions in the url scheme.  I guess just precede the article name with its author?

As far as urlifying titles go, we might as well just keep a reference to both the title and the derived url in the data itself and then update the url when the title is created or changed.  I feel like the less we have to actually do URLifying the better.

We need to address the problem of keeping track of revisions.  The best way to do this would be using deltas, I think, but that might be more complicated than desired for this prototype stage.  So as a simple alternative, articles and revisions are all kept in the same collection, and everything in this collection keeps the id of its root article, which, in the case of the original, is itself.  Aside from that, a simple revision number is affixed to every element in the Articles collection, and incremented for each revision.  

package controllers;

import models.Poll;
import play.mvc.Controller;
import play.mvc.Result;

public class VoteController extends Controller {

    public static Result postVote(Long pollId, int choice) {
        if (!PollController.cacheContainsPoll(pollId)) {
            return badRequest();
        }

        // TODO: not atomic
        Poll poll = PollController.getPollFromCache(pollId);
        poll.addVote(choice);
        PollController.putPollIntoCache(poll);

        return ok();
    }
}

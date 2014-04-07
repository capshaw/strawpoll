package controllers;

import models.Poll;
import play.cache.Cache;
import play.libs.Json;
import play.mvc.*;
import play.data.DynamicForm;
import play.data.Form;

import java.util.*;

public class PollController extends Controller {

    /* A poll is valid for fifteen minutes. */
    public static final int POLL_VALID_MILLISECONDS = 1000 * 60 * 15;

    /**
     * Render a GET request for a particular poll, keyed by id.
     * @param id The poll's id.
     * @return A rendered poll page if the poll exists, 404 page otherwise.
     */
    public static Result getPoll(Long id) {
        if (!cacheContainsPoll(id)) {
            return badRequest();
        }

        return ok(Json.toJson(getPollFromCache(id)));
    }

    /**
     * Handle POST requests at `/poll`. Expects a `question` form parameter.
     * @return A SEE_OTHER redirect on success, Bad Request response otherwise.
     */
    public static Result postPoll() {

        /* Parse the request and check for all required parameters. */
        DynamicForm requestData = Form.form().bindFromRequest();
        String question = requestData.get("question");
        String choicesString = requestData.get("choices");
        if (question == null || choicesString == null) {
            return badRequest();
        }

        /* Create the poll and put it in our cache. */
        List<String> choices = Arrays.asList(choicesString.split("\n"));
        Poll poll = createPoll(question, choices);
        putPollIntoCache(poll);

        return ok(Json.toJson(poll));
    }

    // TODO: move these into model or ... ?
    public static boolean cacheContainsPoll(Long id) {
        return (Cache.get(pollIndex(id)) != null);
    }

    public static Poll getPollFromCache(Long id) {
        return (Poll)Cache.get(pollIndex(id));
    }

    public static void putPollIntoCache(Poll poll) {
        Date expires = poll.getExpiration();
        Date now = new Date();
        int remainingSeconds = (int) ((expires.getTime() - now.getTime()) / 1000);
        Cache.set(pollIndex(poll.getId()), poll, remainingSeconds);
    }
    // TODO: see previous TODO

    /**
     * Helper function to create a new poll given a poll question.
     * @param question The question being answered in this poll.
     * @return The newly created poll object.
     */
    private static Poll createPoll(String question, List<String> choices) {
        Random random = new Random();
        Long id = (long) random.nextInt(Integer.MAX_VALUE);
        Date expires = new Date();
        expires.setTime(expires.getTime() + POLL_VALID_MILLISECONDS);
        return new Poll(id, question, choices, expires);
    }

    /**
     * Helper function to transform a poll's id to the application cache key.
     * @param id The poll's ID.
     * @return The poll's cache key.
     */
    private static String pollIndex(Long id) {
        return "poll-" + id;
    }
}

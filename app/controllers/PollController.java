package controllers;

import models.Poll;
import play.cache.Cache;
import play.mvc.*;
import play.data.DynamicForm;
import play.data.Form;

import views.html.*;

import java.util.Date;
import java.util.Random;

public class PollController extends Controller {

    /* A poll is valid for fifteen minutes. */
    public static final int POLL_VALID_MILLISECONDS = 1000 * 60 * 15;

    /**
     * Render a GET request for a particular poll, keyed on ID in hex format.
     * @param id The poll's id.
     * @return A rendered poll page if the poll exists, 404 page otherwise.
     */
    public static Result getPoll(Long id) {
        Poll p = (Poll)Cache.get(pollIndex(id));

        /* Show a generic 404 error if the poll doesn't exist. */
        if (p == null) {
            return ok(error404.render());
        }

        return ok(poll.render(p));
    }

    /**
     * Handle POST requests at `/poll`. Expects a `question` form parameter.
     * @return A SEE_OTHER redirect on success, Bad Request response otherwise.
     */
    public static Result postPoll() {

        /* Attempt to parse the request. If no question value in the request,
         * it's a bad request. */
        DynamicForm requestData = Form.form().bindFromRequest();
        String question = requestData.get("question");
        if (question == null) {
            return badRequest();
        }

        /* Create the poll and put it in our cache. */
        Poll poll = createPoll(question);
        Cache.set(pollIndex(poll.getId()), poll, POLL_VALID_MILLISECONDS / 1000);
        return redirect("/poll/" + poll.getId());
    }


    /**
     * Helper function to create a new poll given a poll question.
     * @param question The question being answered in this poll.
     * @return The newly created poll object.
     */
    private static Poll createPoll(String question) {
        Random random = new Random();
        Long id = (long) random.nextInt(Integer.MAX_VALUE);
        Date expires = new Date();
        expires.setTime(expires.getTime() + POLL_VALID_MILLISECONDS);
        return new Poll(id, question, expires);
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

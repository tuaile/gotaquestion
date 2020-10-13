<?php
    /**
 * Class RateLimitCounter
 * Track number of events by time. Intended to be set on a session.
 */
class RateLimitCounter
{
    // The time -> request count data
    private $timeline = [];

    /**
     * Log an event in the timeline
     */
    public function increment()
    {
        $now = time();
        if (!array_key_exists($now, $this->timeline))
        {
            $this->timeline[$now] = 0;
        }

        $this->timeline[$now]++;
    }

    /**
     * Return the total number of events logged in the counter
     * @return int
     */
    public function getTotal()
    {
        return array_sum($this->timeline);
    }

    /**
     * Remove any timeline data older than 24 hours
     */
    private function trim()
    {
        // Get the current time
        $now = time();

        // Time is in seconds, so subtract 1 day worth of seconds
        $timeFloor = $now - 86400;

        // Filter out all timeline entries more than 24 hours old
        $this->timeline = array_filter($this->timeline, function ($key) use ($timeFloor) {
            return $key > $timeFloor;
        }, ARRAY_FILTER_USE_KEY);
    }

    public function __serialize(): array
    {
        return [
            'timeline' => $this->timeline
        ];
    }

    /**
     * Wake up! Set the timeline data and trim data older than 24 hours
     * @param array $data
     */
    public function __unserialize(array $data): void
    {
        $this->timeline = $data['timeline'];

        $this->trim();
    }
}

/**
 * Verify that the rate limit has not been exceeded. Bail out if it has been.
 * @param $counter
 * @return bool
 */
function rateLimit($counter)
{
    $limit = 1000;
    if ($counter->getTotal() > $limit)
    {
        // Do whatever you need to here, throw an exception, redirect to an error page, etc.
        exit('Rate limit exceeded' . PHP_EOL);
    }

    return true;
}

/*
 * Instantiate a counter - this is what you would do if you do not already have one on the session
 */
$counter = new RateLimitCounter();

/*
 * Simulate some prior activity
 * Let's get close to the limit then save to the "session"
 */
for ($i = 0; $i <= 995; $i++)
{
    $counter->increment();
}

// Mock session
$dummySession = ['counter' => $counter];

// Serialize the session
$serializedSession = serialize($dummySession);

// Unserialize the session
$session = unserialize($serializedSession);

$counter = $session['counter'];

// Do API calls until we hit our limit. There should be 5 remaining.
while (rateLimit($counter))
{
    apiCall();

    // Don't forget to increment the counter for each call
    $counter->increment();
}

// Dummy function to simulate your API call
function apiCall()
{
    echo 'Doing something interesting' . PHP_EOL;
}
?>


if($_SESSION['user_session']->ratelimited()) {
        http_response_code(429);
        die();
    }
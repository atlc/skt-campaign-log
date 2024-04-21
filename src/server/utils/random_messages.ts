// Had ChatGPT generate some DND based phrases here for the successes and errors

const errors = [
    "Critical Failure! The fates are against you!",
    "Natural 1! You stumble in the darkness of defeat!",
    "Error! Your plans unravel like a poorly cast spell!",
    "Defeat! Your efforts falter in the face of adversity!",
    "Critical Miss! Your aim is true, but fortune betrays you!",
    "Natural Failure! Your hopes dashed upon the rocks of fate!",
    "Disaster Strikes! Your path is fraught with peril and misfortune!",
    "Critical Fumble! Your actions backfire with disastrous consequences!",
    "Epic Fail! Your defeat resounds like thunder in the halls of despair!",
    "Critical Error! Your misstep leads to a catastrophic downfall!",
];

const successes = [
    "Critical Success! You've achieved the impossible!",
    "Natural 20! You've unlocked a legendary achievement!",
    "Success! Your prowess shines like a radiant beacon!",
    "Triumphant Victory! Your name shall be sung in bardic tales!",
    "Critical Hit! Your success strikes true, like a master swordsman!",
    "Natural Success! Your deeds shall be recorded in the annals of history!",
    "Rolling in Success! Your fortune turns, like the wheel of fate!",
    "Critical Triumph! Your success echoes throughout the land!",
    "Epic Win! Your victory is celebrated in every corner of the realm!",
    "Critical Achievement Unlocked! Your success is legendary, like a dragon's hoard!",
];

function get_random_string_from(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function random_success() {
    return get_random_string_from(successes);
}

function random_error() {
    return get_random_string_from(errors);
}

export default {
    error: random_error,
    success: random_success,
};

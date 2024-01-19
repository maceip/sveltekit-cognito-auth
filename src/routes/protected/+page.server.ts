const json = (r: Response) => r.json();

export async function load({ locals }) {
    const channels = await fetch('https://650h9huy8b.execute-api.us-west-1.amazonaws.com/prod/api/channels', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": locals.session.user.aws,
        },
    }).then(json);
    return { channels: channels[0] };

}

/** @type {import('./$types').Actions} */
export const actions = {
    getChannels: async (event) => {
        const data = await event.request.formData();
        const channels = await fetch('https://650h9huy8b.execute-api.us-west-1.amazonaws.com/prod/api/channels').then(json);
        return { channels }
    },
}

const poolConnection = require("../config/connectDB");

const getTime = require("../helpers/getTime");

class MultipleTable {

    liveStreamCompleted = async ({video_url="", reference_id=""}) => {
        
        try {
            const end_time = getTime() // video url later
            const updateQuery = `
            UPDATE live_streams SET end_time = ?, video_url = ? WHERE reference_id = ?; 

            UPDATE appointments a
            INNER JOIN live_streams ls
            ON a.live_stream_id = ls.id
            SET a.status = ? 
            WHERE ls.reference_id = ? AND a.status = ?
            `;

            const [result, _] = await poolConnection.query(updateQuery, 
                [
                end_time, video_url, reference_id, // first query
                'completed', reference_id, 'onGoing'
            ]);

            return result
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = MultipleTable;
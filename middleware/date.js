/**returns duration of day btn to isoString dates */
const durationDays = (initial_date, destination_date) => {
    let i_date = new Date(initial_date)
    let d_date = new Date(destination_date)
    let duration = d_date.getTime() - i_date.getTime()
    return duration / (1000 * 3600 * 24)
}
/**accepts initial date and destination date and check duration is valid */
exports.checkDate = (initial_date, destination_date) =>
    durationDays(initial_date, destination_date) >= 0
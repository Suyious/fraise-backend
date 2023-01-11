export const search = (query, keyword) => {
  return query.find({ title: { $regex: keyword, $options: "i" } })
}

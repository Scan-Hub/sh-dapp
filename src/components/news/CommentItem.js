function CommentItem(props) {
  const { name, avatar, description } = props
  return (
    <div className="">
      <div className="py-6">
        <div className="flex flex-row gap-x-4 py-4">
          <div>
            <div className="w-[48px] h-[48px] rounded-full bg-black">
              <img src={avatar} alt="avatar" className="w-full object-cover" />
            </div>
          </div>
          <div className="">
            <div className="mb-1 text--semibold-xl">{name}</div>
            <div className="text--regular">
              <div className="text-border mb-6">976 follower</div>
              <p className="mb-4">{description}</p>
              <div className="text-border">Show more</div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  )
}

export default CommentItem

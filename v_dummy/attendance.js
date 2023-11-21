{holiday ? (
    <Link
      to="#"
      className="text-danger"
    >
      <b className="">H</b>
    </Link>
  ) : stu.is_present ? (
    <div className="d-flex justify-content-center gap-3 ">
      <Link
        to="#"
        className={
          stu.is_present
            ? "text-primary"
            : "text-secondary"
        }
        onClick={() =>
          onPresent(stu.id)
        }
      >
        <AiOutlineCheck />
      </Link>
    </div>
  ) : (
    <div className="d-flex justify-content-center gap-3 ">
      <Link
        to="#"
        className={"text-danger"}
        onClick={() =>
          onAbsent(stu.id)
        }
      >
        <RxCross2 className="" />
      </Link>
    </div>
  )}
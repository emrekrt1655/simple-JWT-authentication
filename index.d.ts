export type UserCreateArgs = {

    select?: XOR<UserSelect, null>
  
    include?: XOR<UserInclude, null>
  
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  
  }
var RoleEnum;
(function (RoleEnum) {
    RoleEnum[RoleEnum["ADMIN"] = 0] = "ADMIN";
    RoleEnum[RoleEnum["READ_ONLY"] = 1] = "READ_ONLY";
    RoleEnum[RoleEnum["AUTHOR"] = 2] = "AUTHOR";
})(RoleEnum || (RoleEnum = {}));
var person = {
    name: 'Lucas',
    age: 30,
    hobbies: ['Sports', 'Music', 'Cooking'],
    role: RoleEnum.ADMIN
};
console.log(person);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
if (person.role === RoleEnum.ADMIN) {
    console.log('is an admin');
}

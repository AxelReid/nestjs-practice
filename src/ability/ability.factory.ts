import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { File } from 'src/file-upload/entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { Action } from './action.enum';

export type Subjects = InferSubjects<typeof User | typeof File> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');

      can(Action.Update, User, { id: user.id });
      can(Action.Delete, User, { id: user.id });

      can(Action.Update, File, { userId: user.id });

      can(Action.Delete, File, { userId: user.id });
    }

    return build({
      detectSubjectType: (subject) =>
        subject.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

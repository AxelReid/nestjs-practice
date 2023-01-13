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

    if (user?.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
      cannot(Action.Update, 'all', { userId: { $ne: user?.id } });
      cannot(Action.Delete, 'all', { userId: { $ne: user?.id } });
    }

    return build({
      detectSubjectType: (subject) =>
        subject.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
